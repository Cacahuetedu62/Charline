import { Octokit } from "https://esm.sh/octokit"

class Home {
        constructor(){

 // elle invente un descriptionHTML pour avoir la description du profil, elle reprend
 // le js-home-description dans l'index 
 //elle invente profilHTML pour avoir l url de son profil   

            this.descriptionHTML = document.querySelector('.js-home-description')
            this.profilHTML = document.querySelector('.js-home-profil-url')
            this.avatarHTML = document.querySelector('.js-home-avatar')

            this.projectsTitle = document.querySelectorAll('.js-home-project-title')
            this.projectsDescription = document.querySelectorAll('.js-home-project-description')
            this.projectsTagsContainer = document.querySelectorAll('.js-home-project-tags-container')

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
            this.updateHTMLUser(data)})


         .catch((error)=>{
        console.log("ERREUR lors de l'appel API", error)})}

//#2 exemple avec okctokit pour les infos de droite, la liste des derniers projets (aller chercher les repos)
// tout ce qui est en dessous de getReposInfirmations elle l'a trouver dans octokit
// copier coller de son repos car impossible de trouver mon erreur avant
async getReposInformations() {
    const octokit = new Octokit()
    const response = await octokit
        .request("GET /users/charline-studi/repos")
        .catch((error) => {
            console.log("ERREUR lors de l'appel api getReposInformations", error)})


// recentsProjecrs récupère response.data qu'il tri avec la fonction slice
// puis la boucle for récupère "tant que i est inférieur au élément du tableau tu va faire un appel API"
//clean URL nettoie l'url, elle demande de remplace ce qui est entre guillemets par "rien"

const recentsProjects = response.data.slice(-3)
// URL pour récupérer les langages d'un projet :
// https://api.github.com/repos/charline-studi/{nom-du-repo}/languages
for (let i = 0; i < recentsProjects.length; i++) {
        const languagesUrl = recentsProjects[i].languages_url
        const cleanedUrl = languagesUrl.replace("https://api.github.com", "")
        const responseLanguages = await octokit
            .request(`GET ${cleanedUrl}`)
            .catch((error) => {

             console.log("ERREUR lors de l'appel api getReposInformations - langages", error)
    })

    //elle utilise le tableau recentProject ou elle envoie la const projectLanguages
            const projectLanguages = responseLanguages.data
            recentsProjects[i].languages = projectLanguages
            console.log(recentsProjects[i])
        
   
}
            this.updateHTMLProjects(recentsProjects)}
        

        updateHTMLUser(APIdata){
        this.descriptionHTML.textContent =  APIdata.bio
        this.profilHTML.setAttribute ("href", APIdata.html_url)
        this.avatarHTML.setAttribute ("src", APIdata.avatar_url)}

        updateHTMLProjects(projects) {
            const maxIndex = projects.length - 1
            let htmlIndex = 0
                for(let i = maxIndex; i > maxIndex - 3; i--){
                const project = projects[i]
                this.projectsTitle[htmlIndex].textContent = project.name        
                this.projectsDescription[htmlIndex].textContent = project.description  

                this.createHTMLLanguageTag(this.projectsTagsContainer[i], project.languages)
                htmlIndex++
                
               
         } }
        //elle creer une fonction qui transformer le code en HTML (pas trop compris) 
        //où (dans les <div> de l'index) la fonction creer le HTML et lequels?
        //elle rajoute cette fonction dans la boucle ci dessus
        // les keys sont les noms de propriétées ici ce sont les languages d'un repos
        // du coup elle creer un tableau arrayLanguages
        // elle veux faire apparraitre les éléments dans un <span> alors elle utilise la fonction native createElement
        createHTMLLanguageTag(div, languages){
        console.log('div', div)
        console.log('languages', languages)
        const arrayLanguages = Object.keys(languages)
        for (let i = 0 ; i<arrayLanguages.length; i++){
            const span = document.createElement ('span')
        span.textContent = arrayLanguages[i]
        div.appendChild(span)
    
    }


        console.log(arrayLanguages)
        }}


        export { Home }