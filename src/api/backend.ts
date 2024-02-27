import Pocketbase from "pocketbase";

const backend = new Pocketbase(process.env.EXPO_PUBLIC_BACKEND_URL);

export default backend;
