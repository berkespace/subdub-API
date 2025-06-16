
const errorMiddleware = (err, req, res, next) => {

    try {
       let error = {...err};

       error.message = err.message;

       console.error(err);
       
        // Mongoose bad ObjectId error
       if (err.name === 'CastError') {
          const message= `Resource not found. Invalid: ${err.path}`;
          error = new Error(message);
          error.statusCode = 404;
       }

       // Mongoose duplicate key error
         if (err.code === 11000) {
             const message = `Duplicate field value entered: ${err.keyValue.name}`;
             error = new Error(message);
             error.statusCode = 400;
         }

         // Mongoose validation error
         if (err.name === 'ValidationError') {
              const message = Object.values(err.errors).map(val => val.message);
              error = new Error(message.join(', '));
              error.statusCode = 400;
         }

         // Mongoose JSON Web Token error
         if (err.name === 'JsonWebTokenError') {
             const message = 'JSON Web Token is invalid. Try again';
             error = new Error(message);
             error.statusCode = 401;
         }

            // Mongoose Token Expired error
            if (err.name === 'TokenExpiredError') {
                const message = 'JSON Web Token has expired. Try again';
                error = new Error(message);
                error.statusCode = 401;
            }

            res.status(error.statusCode || 500).json({
                success: false,
                error: error.message || 'Server Error'
            });




    }   catch (error) {
       next(error);
    }

};


export default errorMiddleware;
// This middleware handles errors that occur in the application.