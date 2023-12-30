function convertToCsv() {
	const file = document.getElementById('file-selector');
	const firstFile = file.files[0];
	const value = document.getElementById('value');
	const inputValue = value.value;
	firstFile.arrayBuffer().then((res) => {
		let data = new Uint8Array(res);
		let workbook = XLSX.read(data, { type: 'array' });
		let firstSheetName = workbook.SheetNames[0];
		let worksheet = workbook.Sheets[firstSheetName];
		let jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
		let newJson = jsonData.map((x) => ({
			...x,
			ColumnName: inputValue,
			ColumnName2: 'Just cause',
		}));
		let fileNameWithoutExtension = file.name.substring(
			0,
			file.name.indexOf('.')
		);
		let newWorksheet = XLSX.utils.json_to_sheet(newJson);
		let newWorkbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(
			newWorkbook,
			newWorksheet,
			'Total Inventory Report'
		);
		XLSX.writeFile(newWorkbook, fileNameWithoutExtension + '.csv');
	});
}
