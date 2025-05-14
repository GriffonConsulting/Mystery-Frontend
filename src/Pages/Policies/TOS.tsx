import * as React from 'react';
import Container from '@mui/material/Container';

const TOS = (): JSX.Element => {
  return (
    <Container style={{ marginTop: 32 }}>
      <h1>Conditions Générales de Vente (CGV)</h1>

      <h2>1. Objet</h2>
      <p>
        Les présentes Conditions Générales de Vente régissent les relations contractuelles entre{' '}
        <strong>[Nom de l'entreprise]</strong> (ci-après "le Vendeur") et toute personne physique ou morale (ci-après
        "le Client") souhaitant acheter des produits ou services proposés sur le site{' '}
        <strong>[Nom du site ou URL]</strong> (ci-après "le Site").
      </p>

      <h2>2. Produits et services</h2>
      <p>Le Vendeur propose à la vente :</p>
      <ul>
        <li>Des kits de jeux d’enquête et murder party à imprimer.</li>
        <li>Des fichiers numériques téléchargeables (PDF, vidéos, etc.).</li>
      </ul>
      <p>
        Les caractéristiques essentielles des produits sont présentées sur le Site. Le Client est tenu d'en prendre
        connaissance avant toute commande.
      </p>

      <h2>3. Commande</h2>
      <p>Toute commande implique l’acceptation sans réserve des présentes CGV.</p>
      <p>Pour passer commande, le Client doit :</p>
      <ul>
        <li>Créer un compte ou renseigner ses informations personnelles ;</li>
        <li>Sélectionner le ou les produits/services ;</li>
        <li>Valider la commande après vérification ;</li>
        <li>Effectuer le paiement.</li>
      </ul>
      <p>Une confirmation de commande sera envoyée par e-mail.</p>

      <h2>4. Tarifs</h2>
      <p>
        Les prix sont indiqués en euros, toutes taxes comprises (TTC). Le Vendeur se réserve le droit de modifier ses
        prix à tout moment, sans préavis, mais les produits seront facturés sur la base des tarifs en vigueur au moment
        de la validation de la commande.
      </p>

      <h2>5. Paiement</h2>
      <p>
        Le règlement s’effectue via les moyens de paiement proposés sur le Site (carte bancaire, PayPal, etc.). Le
        paiement est exigible immédiatement à la commande.
      </p>
      <p>
        Le Site utilise un système de paiement sécurisé. Les données de paiement ne sont pas conservées par le Vendeur.
      </p>

      <h2>6. Livraison</h2>
      <p>
        Les produits numériques sont accessibles immédiatement après paiement via un lien de téléchargement ou un espace
        personnel. Aucun envoi physique n'est réalisé.
      </p>

      <h2>7. Droit de rétractation</h2>
      <p>
        Conformément à l’article L221-28 du Code de la consommation, le droit de rétractation ne s’applique{' '}
        <strong>pas</strong> aux contenus numériques fournis sur un support immatériel, une fois le téléchargement
        commencé.
      </p>

      <h2>8. Responsabilité</h2>
      <p>
        Le Vendeur ne saurait être tenu responsable en cas d’utilisation inappropriée des jeux, de non-respect des
        consignes, ou de problèmes techniques indépendants de sa volonté.
      </p>
      <p>
        Les jeux proposés sont fictifs. Toute ressemblance avec des faits réels est fortuite. Ils ne conviennent pas à
        un public sensible ou trop jeune (âge conseillé indiqué sur chaque fiche produit).
      </p>

      <h2>9. Propriété intellectuelle</h2>
      <p>
        Tous les éléments du Site et des produits vendus (textes, illustrations, fichiers, scénarios) sont protégés par
        le droit d’auteur. Toute reproduction ou diffusion sans autorisation est interdite.
      </p>

      <h2>10. Données personnelles</h2>
      <p>
        Les données collectées sont nécessaires au traitement des commandes et à la gestion de la relation client. Le
        Client dispose d’un droit d’accès, de rectification et de suppression de ses données conformément à la loi
        "Informatique et Libertés" et au RGPD.
      </p>

      <h2>11. Droit applicable et litiges</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée. À
        défaut, les tribunaux du ressort du siège social du Vendeur seront seuls compétents.
      </p>
    </Container>
  );
};

export default TOS;
