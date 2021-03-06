module Main

import Data.List
import Data.Strings

main : IO ()
main = putStrLn "Hello Idris World!"

average : String -> Double
average str = let numWords = wordCount str
                  totalLength = sum (allLengths (words str)) in
                  cast totalLength / cast numWords
              where
                wordCount : String -> Nat
                wordCount str = length (words str)

                allLengths : List String -> List Nat
                allLengths strs = map length strs
