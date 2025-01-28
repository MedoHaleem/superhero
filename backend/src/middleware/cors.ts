import cors from "cors";

export default (origin: string | string[]) => {
    return cors({
        origin,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    });
};