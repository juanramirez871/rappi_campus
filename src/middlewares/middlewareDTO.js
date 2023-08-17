import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';


const middlewareDTO = (classDto) => async(req, res, next) => {
    try {
        let data = plainToClass(classDto, req.body, { excludeExtraneousValues: true });
        req.body = data;
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}
export default middlewareDTO;