import asyncHandler from "express-async-handler";
import Movie from "../Models/MoviesModel.js";
import { MoviesData } from "../Data/MovieData.js";

//***PUBLIC CONTROLLER****/
//import movies
//route POST /api/movies/import
//access public

const importMovies = asyncHandler(async (req, res) => {
    //dùng delete all để chắc rằng danh sách movie của ta trống
    await Movie.deleteMany({});
    //Sau đó add tất cả movies từ MoviesData
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
});

//lấy tất cả movie
//route get /api/movies
//access public

const getMovies = asyncHandler(async (req, res) => {
    try {
        //sắp xếp movie theo category, time, language, rate, year
        const { category, time, language, rate, year, search } = req.query;
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name : { $regex: search, $options: "i" } }),
        };

        //load more movie 
        const page = Number(req.query.pageNumber) || 1; // nếu như pageNumber không được cung cấp thì set nó thành 1 
        const limit = 10; //mỗi page xuất hiện 2 movie
        const skip = (page - 1) * limit; //bỏ qua 2 movie mỗi page

        //tìm movies sử dụng query
        const movies = await Movie.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

        //Lấy tổng số movies
        const count = await Movie.countDocuments(query);

        //gửi phản hồi 
        res.json({ 
            movies, 
            page, 
            pages: Math.ceil(count / limit), //tổng page
            totalMovies:count, //tổng movies
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//get movie by id
//route GET /api/movies/:id
//access public

const getMovieById = asyncHandler(async (req, res) => {
    try {
        //find movie by id
        const movie = await Movie.findById(req.params.id);
        //nếu như movie tim thấy gửi về client
        if (movie) {
            res.json(movie);
        }
        //còn không báo lỗi
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//lấy top rated movie
//route GET /api/movies/rated/top
//access public

const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        //tìm top rated movie
        const movies = await Movie.find({}).sort({ rate: -1 });
        //gửi top rated movie về client
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//lấy random movie
//route get /api/movies/random
//access public

const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        //tìm random movie
        const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
        //gửi random movies về client
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//*****Private Controller******/

//tạo movie review
//route POST /api/movies/:id/reviews
//access private

const createMovieReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    try {
        //tìm movie bằng id trong DB
        const movie = await Movie.findById(req.params.id);
        //nếu như movie tìm thấy chuyển về client
        if (movie) {
            //kiểm tra user đã để review phim này chưa 
            const alreadyReviewed = movie.reviews.find(
                (r) => r.userId.toString() === req.user._id.toString()
            );
            //nếu như user đã review rồi báo lỗi
            if (alreadyReviewed) {
                res.status(400);
                throw new Error("You already reviewed this movie");
            }
            //nếu không tạo review mới
            const review = {
                userName: req.user.fullName,
                userId: req.user._id,
                userImage: req.user.image,
                rating: Number(rating),
                comment,
            }
            movie.reviews.push(review);
            movie.numberOfReviews = movie.reviews.length;
            movie.rate = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;
            //lưu movie vào DB
            await movie.save();
            //gửi movie mới được cập nhật lên client
            res.status(201).json({ message: "Review added "});
        } else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//***Admin Controller****/

//Update movie
//route PUT /api/movies/:id
//access private/admin

const updateMovie = asyncHandler(async (req, res) => {
    try {
        //lấy data từ req body
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
        } = req.body;
        //tìm movie bằng id trong DB
        const movie = await Movie.findById(req.params.id);

        if (movie){
            //cập nhật movie data
            movie.name = name || movie.name;
            movie.desc = desc || movie.desc;
            movie.image = image || movie.image;
            movie.titleImage = titleImage || movie.titleImage;
            movie.rate = rate || movie.rate;
            movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
            movie.category = category || movie.category;
            movie.time = time || movie.time;
            movie.language = language || movie.language;
            movie.year = year || movie.year;
            movie.video = video || movie.video;
            movie.casts = casts || movie.casts;
            //lưu movie vào db
            const updateMovie = await movie.save();
            //gửi update về client
            res.status(201).json(updateMovie); 
        } else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete movie
//route DELETE /api/movies/:id
//access private/admin

const deleteMovie = asyncHandler(async (req, res) => {
    try {
        //tìm movie bằng id 
        const movie = await Movie.findById(req.params.id);
        //nếu tìm thấy movie thì xóa
        if (movie) {
            await movie.deleteOne();
            res.json({ message: "Movie have been removed" });
        }
        //nếu như movie không tim thấy báo lỗi 404 
        else { 
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete all moves
//route delete /api/movies
//access private/admin

const deleteAllMovies = asyncHandler(async (req, res) => {
    try {
        //delete all movies
        await Movie.deleteMany({});
        res.json({ message: "All movie have been deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Create movie
//route POST /api/movies
//access private/admi

const createMovie = asyncHandler(async (req, res) => {
    try {
        //lấy data từ req body
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
        } = req.body;
    
        //Tạo new movie
        const movie = new Movie({
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
            userId: req.user._id,
        });
        //lưu movie vào DB
        if (movie) {
            const createdMovie = await movie.save();
            res.status(201).json(createdMovie);
        }
        else {
            res.status(400);
            throw new Error("Invalid movie data");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { 
    importMovies, 
    getMovies, 
    getMovieById, 
    getTopRatedMovies, 
    getRandomMovies, 
    createMovieReview, 
    updateMovie,
    deleteMovie,
    deleteAllMovies,
    createMovie,
};