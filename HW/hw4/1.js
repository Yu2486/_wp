function countletters(str)
{
    const lettercount=new Map();

    for(const char of str)
    {
        if(lettercount.has(char))
        {
            lettercount.set(char,lettercount.get(char)+1);
        }
        else
        {
            lettercount.set(char,1);
        }
    }
    return lettercount;

}

console.log(countletters("banana"));
