export default (schema) => async (req, res, next) => {
    try {
        // const id = req.params.id;
        // console.log("The ID is:", id);

        // Validate request body with the given schema and pass `id` as part of context
        const value = await schema.validateAsync(req.body, {
            abortEarly: false, // Return all errors
            context: { id: req.params.id }
        });
        // console.log("The VALUE IS :",value);
        // req.body = value;
        // Proceed to the next middleware if validation passes
        next();
    } catch (error) {
        console.log("Request body is:", req.body);

        // Log error details if they exist (for Joi errors)
        if (error.details) {
            const errors = error.details.map((detail) => detail.message);
            console.error("Validation errors:", errors); // Log detailed error messages
            return res.status(400).json({ errors }); // Send detailed validation errors to the client
        }
        
        // Log the full error object for further inspection if not a Joi error
        console.error("Full error object:", error);
        res.status(500).send("An unexpected error occurred during validation. " + error.message);
    }
};
