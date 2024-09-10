class Home {
constructor(){

 // elle invente un descriptionHTML pour avoir la description du profil, elle reprend
 // le js-home-description dans l'index 
 //elle invente profilHTML pour avoir l url de son profil   

this.descriptionHTML = document.querySelector('.js-home-description')
this.profilHTML = document.querySelector('.js-home-profil-url')
}

//elle fait le get pour recuperer le this au dessus depuis l'API

init() {
this.getUserInformations()

}

// getUserInformations est la fonction qui va appeler l'API
getUserInformations(){

    
}


}

export { Home } 