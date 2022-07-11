import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

// Change the cors expression according to the neeeds
app.use(cors({ origin: '*' }));

// Support json response
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('hello')
})
export const ignite = () => {
	app.listen(process.env.PORT, () => {
		console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT}`);
	});
};
export default app;
