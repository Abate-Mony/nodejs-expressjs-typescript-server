import Product from "../models/productModel.js";

function generateRandomString(length: number = 4): string {
  // Define the character set
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Create an empty string to store the result
  let result = "";

  // Loop for the desired length
  for (let i = 0; i < length; i++) {
    // Get a random index within the character set
    const randomIndex = Math.floor(Math.random() * charset.length);

    // Extract the character at the random index
    const randomChar = charset[randomIndex];

    // Append the character to the result string
    result += randomChar;
  }

  // Return the generated random string
  return result;
}
async function generateUniqueRandomString(): Promise<string | number> {
  let randomString: string;
  let existingRecord: string | null = null;
  do {
    randomString = generateRandomString();
    existingRecord = await Product.findOne({ id: randomString });
  } while (existingRecord);

  return randomString;
}

// Example usage
// const randomString = generateRandomString();
//   console.log(randomString); // Output: a random string of 6 characters
export { generateUniqueRandomString, generateRandomString };
