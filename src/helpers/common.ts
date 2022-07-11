import fs from 'fs';

export const appendToFile = (
	dir: string,
	fileName: string,
	content: string
): void => {
	try {
		 fs.writeFileSync(dir + '/' + fileName, content, { flag: 'a' });
	} catch (e) {
		console.log(e);
		throw e;
	}
};
