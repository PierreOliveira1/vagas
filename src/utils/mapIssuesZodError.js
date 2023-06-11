function mapIssuesZodError(errors) {
	const issues = errors.issues.map((issue) => {
		return {
			path: issue.path.join('.'),
			message: issue.message,
		};
	});

	return issues;
}

module.exports = { mapIssuesZodError };
