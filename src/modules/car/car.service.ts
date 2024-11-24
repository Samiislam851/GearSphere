import { Car } from "./car.model";


const createCar = async (data: any) => {
    const existingCar = await Car.findOne({
        brand:data.brand,
        model: data.model,
        year: data.year,
        price: data.price
    });
    if (existingCar) {
        throw new Error("This car already exists");
    } else {
        return await Car.create(data);
    }
};

const getAllCars = async (searchTerm: string | undefined) => {
    const filter = searchTerm ? { $or: [{ brand: searchTerm }, { model: searchTerm }, { category: searchTerm }] } : {};
    return await Car.find(filter);
};

const getCarById = async (carId: string) => {
    return await Car.findById(carId);
};

const updateCar = async (carId: string, data: any) => {
    return await Car.findByIdAndUpdate(carId, data, { new: true });
};

const deleteCar = async (carId: string) => {
    return await Car.findByIdAndDelete(carId);
};

export const carService = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
}