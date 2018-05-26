//Connexion à la BDD
$request = $_GET['request'];
$bdd = mysqli_connect("localhost", "root", "", "gefco");
if (!$bdd) {
  echo "Erreur de connexion à la BDD.";
  exit;

  
}

$requete = "SELECT * FROM service  WHERE email='$request'";
if($result = mysqli_query($link, $requete)) {
$nb=0
while($ligne = mysqli_fetch_assoc($result)) {
	$nb=$nb+1
}