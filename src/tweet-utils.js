const RAW_TWEET_LENGTH = 240;
const ELLIPSES_LENGTH = ('. . .'.length) * 2;
const RANGE_LENGTH = ('(3000/5000))'.length);
const TWEET_LENGTH = RAW_TWEET_LENGTH - ELLIPSES_LENGTH - RANGE_LENGTH;

export function tweetIsValid(tweet, wholeString) { 
  const nextCharAfterTweet = wholeString[tweet.length];
  const lastCharOfTweet = tweet[tweet.length - 1];

  const tweetIsWholeBook = wholeString.length <= 240;
  const tweetEndsInOrIsFollowedByASpace = [nextCharAfterTweet, lastCharOfTweet].includes(' ');

  return tweetIsWholeBook || tweetEndsInOrIsFollowedByASpace;
}

export function makeArray(book) {
  // book = book.replace(/\n/g, '');
  const arr = [];

  while (book.length) {
    let newTweet = book.slice(0, TWEET_LENGTH);

    // ask, is newTweet valid?
    // TODO: implement rule so that tweets dont cut off in the middle of a word. what does "tweet cut off perfectly at end of word"/"valid tweet" mean? it means:
    // 1) the last character of a tweet IS a space or 
    // 2) the last character of a tweet is FOLLOWED BY a space

    while (!tweetIsValid(newTweet, book)) {
      newTweet = book.slice(0, newTweet.length - 1);
    }

    arr.push(newTweet);
    book = book.slice(newTweet.length);
  }

  return arr;
}

