import { setupServer } from "./server.js";
import { initMongoDB } from "./db/initMongoConnection.js";
import createDirIfNotExists from "./utils/createDirIfNotExist.js";
import { POSTER_DIR, PUBLIC_DIR, TEMP_UPLOAD_DIR } from "./constants/index.js";

const bootstrap = async () => {
    await initMongoDB();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(PUBLIC_DIR);
    await createDirIfNotExists(POSTER_DIR);
    setupServer();
}

bootstrap();