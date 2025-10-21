//functions
const getAlignment = (align: string) => {
	if (align == 'center') {
		return 'center';
	} else if (align == 'right') {
		return 'flex-end';
	} else {
		return 'flex-start';
	}
};

export default getAlignment;
