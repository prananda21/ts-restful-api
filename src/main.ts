import { logger } from "./app/logging";
import { web } from "./app/web";

const port = 3000;
web.listen(port, () => {
	logger.info(`Listening on localhost:${port}`);
});
