import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
	name: string;
	type: string;
}

interface requiredItem {
	name: string;
	quantity: number;
}

interface recipe extends cookbookEntry {
	requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
	cookTime: number;
}

interface summary {
	name: string;
	cookTime: number;
	ingredients: requiredItem[];
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: cookbookEntry[] = [];

// Task 1 helper (don't touch)
app.post("/parse", (req: Request, res: Response) => {
	const { input } = req.body;

	const parsed_string = parse_handwriting(input)
	if (parsed_string == null) {
		res.status(400).send("this string is cooked");
		return;
	}
	res.json({ msg: parsed_string });
	return;

});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
	recipeName = recipeName
		.replace(/[-_]/g, ' ')
		.replace(/[^a-zA-Z ]/g, '')
		.toLowerCase()
		.trim()
		.replace(/\s+/g, ' ');

	// If 0 chars left, return null
	if (recipeName.length === 0) {
		return null;
	}

	// First letter of each word is capitalised
	recipeName = recipeName
		.split(" ")
		.map(word => word[0].toUpperCase() + word.slice(1))
		.join(" ");

	return recipeName
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req: Request, res: Response) => {
	const entry = req.body;

	if (typeof entry.name !== 'string' || typeof entry.type !== 'string') {
		return res.status(400).send({});
	}

	// entry names must unique
	if (cookbook.some(e => e.name === entry.name)) {
		return res.status(400).send({});
	}

	if (entry.type === 'ingredient') {
		// cookTime must not be negative
		if (typeof entry.cookTime !== 'number' || entry.cookTime < 0) {
			return res.status(400).send({});
		}

		const ingredient: ingredient = { name: entry.name, type: entry.type, cookTime: entry.cookTime };
		cookbook.push(ingredient);

	} else if (entry.type === 'recipe') {
		if (!Array.isArray(entry.requiredItems)) {
			return res.status(400).send({});
		}

		// no duplicate in requiredItems
		if (new Set(entry.requiredItems.map(i => i.name)).size !== entry.requiredItems.length) {
			return res.status(400).send({});
		}

		const recipe: recipe = { name: entry.name, type: entry.type, requiredItems: entry.requiredItems };
		cookbook.push(recipe);
	} else {
		// Type isnt "recipe" nor "ingredient"
		return res.status(400).send({});
	}

	res.status(200).send({});
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req: Request, res: Response) => {
	const { name } = req.query;
	if (!name || typeof name !== 'string') {
		return res.status(400).send({});
	}

	const entry = cookbook.find(e => e.name === name);
	if (!entry || entry.type !== 'recipe') {
		return res.status(400).send({});
	}

	const result = getSummary(name, (entry as recipe).requiredItems);
	if (result === null) {
		return res.status(400).send({});
	}

	const { cookTime, ingredients } = result;

	res.status(200).send({ name, cookTime, ingredients });
});

const getSummary = (name: string, requiredItems: requiredItem[]): summary | null => {
	let totalCookTime = 0;
	const ingredientSummary: requiredItem[] = [];

	for (const item of requiredItems) {
		// find current item in cookbook
		const entry = cookbook.find(e => e.name === item.name);
		if (!entry) {
			return null;
		}

		if (entry.type === 'recipe') {
			// if current item is a recipe, check ITS required items
			const currRecipe = entry as recipe;
			const currSummary = getSummary(currRecipe.name, currRecipe.requiredItems);
			if (!currSummary) {
				return null;
			}

			totalCookTime += currSummary.cookTime * item.quantity;
			currSummary.ingredients.forEach(i => addIngredient(ingredientSummary, i.name, { name: i.name, quantity: i.quantity * item.quantity }));
		} else if (entry.type === 'ingredient') {
			// if current item is an ingredient, add its cookTime * quantity and add it to the ingredients
			const currIngredient = entry as ingredient;

			totalCookTime += currIngredient.cookTime * item.quantity;
			addIngredient(ingredientSummary, currIngredient.name, item);
		} else {
			// unknown type
			return null;
		}
	}

	return { name: name, cookTime: totalCookTime, ingredients: ingredientSummary };
}

const addIngredient = (ingredientSummary: requiredItem[], currIngredientName: string, item: requiredItem): void => {
	if (ingredientSummary.some(i => i.name === currIngredientName)) {
		const idx = ingredientSummary.findIndex(i => i.name === currIngredientName);
		ingredientSummary[idx].quantity += item.quantity;
	} else {
		ingredientSummary.push({ name: currIngredientName, quantity: item.quantity });
	}
}

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
	console.log(`Running on: http://127.0.0.1:8080`);
});
