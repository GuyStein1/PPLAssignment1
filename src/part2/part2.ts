import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];

// Function to check if a letter is a vowel
const isVowel: (letter: string) => boolean =
    (letter) => R.includes(R.toLower(letter), vowels);

// Function to convert a string to an array of characters
export const countVowels: (str: string) => number = R.pipe(
    stringToArray,
    R.filter(isVowel),
    R.length
);


/* Question 2 */
export const isPalindrome: undefined = undefined;
  
/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence: undefined = undefined;
