import { Octokit } from "https://esm.sh/octokit"

class Home {
        constructor(){

 // elle invente un descriptionHTML pour avoir la description du profil, elle reprend
 // le js-home-description dans l'index 
 //elle invente profilHTML pour avoir l url de son profil   

            this.descriptionHTML = document.querySelector('.js-home-description')
            this.profilHTML = document.querySelector('.js-home-profil-url')
            this.avatarHTML = document.querySelector('.js-home-avatar')

            this.projectTitle = document.querySelector('.js-home-project-title')
            this.projectDescription = document.querySelector('.js-home-project-description')
            this.projectTagsContainer = document.querySelector('.js-home-project-tags-container')

            this.init()
    }

//elle fait le get pour recuperer le this au dessus depuis l'API, init lance les methodes
// il ne faut pas oublier d'appeler init pa run this qu'on fait au dessus
// Le fetch récupère les infos pour la première partie a gauche
// pour la partie de droite elle utilise Octokit
init() {
            this.getUserInformations()
            this.getReposInformations()

}


// getUserInformations est la fonction qui va appeler l'API
// on récupère les infos avec getInformation, on les affichent avec updateHTML
// #utilisation de fetch pour exemple
    getUserInformations(){    
     fetch("https://api.github.com/users/charline-studi")
         .then((response) => response.json())
         .then((data) => {
            this.updateHTML(data)})


         .catch((error)=>{
        console.log("ERREUR lors de l'appel API", error)})}


    updateHTML(APIdata){
        this.descriptionHTML.textContent =  APIdata.bio
        this.profilHTML.setAttribute ("href", APIdata.html_url)
        this.avatarHTML.setAttribute ("src", APIdata.avatar_url)}


//#2 exemple avec okctokit pour les infos de droite, la liste des derniers projets (aller chercher les repos)
// tout ce qui est en dessous de getReposInfirmations elle l'a trouver dans octokit
        async getReposInformations() {
            const octokit = new Octokit()
            const response = await octokit.request ("GET /users/charline-studi/repos")
            console.log(response)
        }  
}

    



export { Home } 