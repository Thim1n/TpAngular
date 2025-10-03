import { Routes } from '@angular/router';
import { Connexion } from './pages/connexion/connexion';
import { Inscription } from './pages/inscription/inscription';
import { ListeDesArticles } from './pages/liste-des-articles/liste-des-articles';
import { DetailAtricles } from './pages/detail-article/detail-article';
import { Formulaire } from './pages/formulaire/formulaire';
import { MotsdepasseOublier } from './pages/motsdepasse-oublier/motsdepasse-oublier';


export const routes: Routes = [
    {path : 'login', component: Connexion},
    {path : 'inscription', component: Inscription},
    {path : 'liste-des-articles', component: ListeDesArticles},
    {path : 'details-article/:id', component: DetailAtricles},
    {path : 'formulaire', component: Formulaire},
    {path : 'formulaire/:id', component: Formulaire},
    {path : 'motsdepasse-oublier', component: MotsdepasseOublier},
];
