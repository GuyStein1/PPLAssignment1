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

const isAlphaNum: (c: string) => boolean = (c) => /[a-z0-9]/i.test(c);

const isPalindromeArray: (chars: string[]) => boolean = (chars) =>
  chars.length <= 1 || (R.head(chars) === R.last(chars) && isPalindromeArray(R.slice(1, -1, chars)));


export const isPalindrome: (phrase: string) => boolean = R.pipe(
    stringToArray,
    R.filter(isAlphaNum),
    R.map(R.toLower),
    isPalindromeArray
);
  
/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

// Function to convert a WordTree to a sentence
// This function recursively traverses the tree and concatenates the words
export const treeToSentence = (t: WordTree): string => {
    const childWords = t.children.reduce(
      (acc: string[], child: WordTree) =>
        acc.concat(treeToSentence(child).split(" ")),
      []
    );
    return [t.root].concat(childWords).join(" ");
  };
