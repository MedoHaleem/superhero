import cors from "cors";

export default (origin: string | string[]) => {
    return cors({
        origin,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Origin"
        ]
    });
};