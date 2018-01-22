export default function getBaseURL() {
	const isInDev = window.location.hostname === 'localhost';

	//If it's in development, url will point to mock API. If it's in production, url will point to production API that's set up in Express
	return isInDev ? 'http://localhost:3001/' : '/';
}
