var sec=30;
function stopwatch()
{
  if(sec>0)
  {
    sec--;
  }
  else
  {
    alert("Koniec czasu, 0 pkt.");
  }
  document.getElementById("watch").innerHTML=sec+"\n seconds";
  setTimeout("stopwatch();",1000);
}
