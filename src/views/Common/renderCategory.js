function renderCategory() {
	const categoryList = document.querySelector('#category-list');
	console.log(categoryList);

	fetch(`/api/category`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error('조회 실패');
			}
		})
		.catch(err => {
			console.log(err);
		})
		.then(({ allCategory }) => {
			allCategory.map(getCategory);
		})
		.catch(err => console.log(err));

	let category = '';
	function getCategory(allCategory) {
		console.log(allCategory);

		const newCategorry = `<li>
            <a href="/products/category/?category=${allCategory._id}">${allCategory.name}</a>
        </li>`;

		category += newCategorry;
		categoryList.innerHTML = category;
	}
}

export { renderCategory };
