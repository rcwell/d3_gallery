export const logger = (_: any) => (next: any) => (action: any) => {
	if (process.env.NODE_ENV === "production") return next(action);

	console.group(action.type)
	console.info('%cDISPATCHING', 'color: #459b4c', action);
	console.groupEnd()
	return next(action);
}
