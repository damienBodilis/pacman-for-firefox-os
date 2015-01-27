function GenerateNewGrid(){
		var Newgrid = new Array();
		var NombreElementParLigne = 17;
		
		for (var i=0; i<21; ++i){
			Ligne = new Array();
			if(i==10){
				Ligne.push(1, 2, 2, 2, 2, 1, 0, 1, 1, 5, 1, 1, 0, 1, 2, 1, 1, 2, 1);
			}
			else if(i==11){
				Ligne.push(1, 2, 2, 2, 2, 2, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2, 1);
			}
			else if (i==12){
				Ligne.push(1, 2, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 2, 1);
			}
			for(var j=0;j<19;++j){
				if(i==0){
					Ligne.push(1);
				}
				else if(i==20){
					Ligne.push(1);
				}
				// c'est ici qu'il faut jouer pour le centre //
				else if(i>0 && i<20 && j!=0 && j!=18 && i!=10 && i!=11 && i!=12){
					Ligne.push(2);
				}
				// c'est plus ici //
				else if(i>0 && j==0 || j==18){
					Ligne.push(1);
				}
			}
			Newgrid.push(Ligne);
		}
		return Newgrid;
		// console.log(Newgrid);
}
function GenerateNewColumnGrid(){
	var NewGrid = new Array();
	var NombreElementParColonne = 22;
	var NombreElementParLigne = 19;
	
	for (var j=0; j<NombreElementParLigne;++j){
		for (var i=0; i<NombreElementParColonne;++i){
			var Colonne = new Array();
			if(j==0 || j==NombreElementParLigne-1){
				Colonne.push(1);
			}
			
		}
		NewGrid.push(Colonne);
	}
	
	return NewGrid;
}
function GenerateDefaultGrid(){

	var DefaultGrid = new Array();
        DefaultGrid.push(new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1));
        DefaultGrid.push(new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1));
        DefaultGrid.push(new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1));
        DefaultGrid.push(new Array(1, 4, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 4, 1));
        DefaultGrid.push(new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1));
        DefaultGrid.push(new Array(1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1));
        DefaultGrid.push(new Array(1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1));
        DefaultGrid.push(new Array(1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1));
        DefaultGrid.push(new Array(0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0));
        DefaultGrid.push(new Array(1, 1, 1, 1, 2, 1, 0, 1, 1, 5, 1, 1, 0, 1, 2, 1, 1, 1, 1));
        DefaultGrid.push(new Array(0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0));
        DefaultGrid.push(new Array(1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1));
        DefaultGrid.push(new Array(0, 0, 0, 1, 2, 1, 0, 0, 0, 7, 0, 0, 0, 1, 2, 1, 0, 0, 0));
        DefaultGrid.push(new Array(1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1));
        DefaultGrid.push(new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1));
        DefaultGrid.push(new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1));
        DefaultGrid.push(new Array(1, 4, 2, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1, 2, 4, 1));
        DefaultGrid.push(new Array(1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1));
        DefaultGrid.push(new Array(1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1));
        DefaultGrid.push(new Array(1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1));
        DefaultGrid.push(new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1));
        DefaultGrid.push(new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1));
	return DefaultGrid;

}