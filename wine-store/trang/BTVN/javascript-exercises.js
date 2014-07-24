//1. Define a function maxOfThree() that takes three numbers as arguments and returns the largest of them.
function maxOfThree(a,b,c){
	var max=a;
	if(max<b)
	{
		max = b;
	}
	if(max<c){
		max =c;
	}
	return max;
}
maxOfThree(6,7,4);
//2. Define a function sum() and a function multiply() that sums and multiplies (respectively) all the numbers in an array of numbers.
//For example, sum([1,2,3,4]) should return 10, and multiply([1,2,3,4]) should return 24.
function sum(params){
	var sum=0;
	for(i=0;i<params.length;i++){
		sum+=params[i];
	}
	return sum;
}
function multiply(params){
	var multiply=1;
	for(i=0;i<params.length;i++){
		multiply*=params[i];
	}
	return multiply;
}
sum([1,2,3,4]);
multiply([1,2,3,4]) ;

//3. Write a function to sort a list of words (an array) in alphabetical order
function alphabeString(array) {
	for (var i = 0; i < array.length; i++){
		for (var j = 0; j < array.length - 1; j++){
			if (array[j] > array[j + 1]){
				temp = array[j + 1];
				array[j + 1] = array[j];
				array[j] = temp;
			}
		}
	}
	return array;
}
alphabeString(["Trang","b","a","A","finish"]);
//4. Write a function findLongestWord() that takes an array of words and returns the length of the longest one.
function findLongestWord(params){
	var max = params[0].length;
	var valueMax= params[0];
	for(i=1;i<params.length;i++){
		if(max<params[i].length){
			max=params[i];
			valueMax= params[i];
		}
	}
	return "the word longest is '" + valueMax + "'";
}
findLongestWord(["params","ab","anmial.js"]);
//5 Write a function filterLongWords() that takes an array of words and an integer i and returns the array of words that are longer than i.

function filterLongWords(array, number){
	var tmp=[];
	var dem=0;
	for(i=0;i<array.length;i++)
	{
		if(array[i].length>number)
		{
			tmp[dem]=array[i];
			dem++;
		}
	}
	return tmp;
}
filterLongWords(["d","dd","gggg","any","a"], 2); 

//6.Write a function to collect elements that appear in 2 arrays
function collect(param1, param2)
{
	var tmp=[];
	var dem=0;
	for(i=0;i<param1.length;i++){
		for(j=0;j<param2.length;j++){
			if(param1[i]===param2[j])
			{
				tmp[dem]=param1[i];
				dem++;
			}
		}
	}
	if(tmp.length){
		for (i=0;i<tmp.length;i++) {
		}
	}
	else{
		console.log('No duplicate values');
	}
	return tmp;
}
collect(["d","dd","gggg","any","a"], ["d","ddo","u","any","am"]);
//7. Write a function to collect all element from 2 arrays that does not appear in both arrays.
function arrayUnique(array1, array2) {
    var array3 = array1.concat(array2);
    for(var i=0; i<array3.length; ++i) {
        for(var j=i+1; j<array3.length; ++j) {
            if(array3[i] === array3[j])
            {
                array3.splice(j--, 1);
               array3.splice(i--, 1);
           }
        }
    }

    return array3;
}
arrayUnique(["d","dd","gggg","any","a"], ["d","ddo","u","any","am"]);
//8. Display the current date on the page in the following format: October 30, 2000.
//Do not display the time. Do not "hard code" the date; if I load the page tomorrow, I should get a different date.

function echoDate(){
 var objDate = new Date();
    var locale = "en-us";
    month = objDate.toLocaleString(locale, { month: "long" });
 return month + " " + objDate.getDate() + ", " + objDate.getFullYear();
}
console.log(echoDate());


//9.Display a message saying Good Morning if it is in the morning, Good Afternoon if it is in the afternoon, and Good Evening if it is in the Evening.
function Greeting(){
	var today= new Date();
	var currentHour=today.getHours();
	console.log(currentHour);
	var greeting;
	if(currentHour>0 && currentHour<12){
		greeting='Good morning';
	}
	else if (currentHour<=16){
		greeting='Good afternoon';
	}
	else if(currentHour<=22){
		greeting='Good everning';
	}
	else{
		greeting='Good night';
			}
	return greeting;
}
Greeting();
//10.Write a function to calculate age in both year and month: Ex: your age is 2 years 6 months
function calculateAge(fromMonth, fromYear){
	var today= new Date();
	var toMonth = today.getMonth() +1;
	var toYear =today.getFullYear();
	var year = toYear - fromYear;
	if (toMonth >= fromMonth){
		month = toMonth - fromMonth;
	}
	else {
		year--;
		month = 12 - fromMonth + toMonth;
	}
	return "Your age is " + year + " years " + month + " months";
}
console.log(calculateAge(8, 1991));

