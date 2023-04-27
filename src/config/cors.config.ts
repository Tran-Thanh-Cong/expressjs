export const corsOptions = {
  origin: `http://localhost:${process.env.PORT}`,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
