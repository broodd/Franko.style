import React, { useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import Sprint from "../../components/Sprint";
import { connect } from "../../data/connect";
import ProductCard from "../../components/ProductCard";
import { RouteComponentProps } from "react-router";
import { loadProducts } from "../../data/sessions/sessions.actions";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  products: any[];
  productsPage: number;
  isLoggedin: boolean;
}

interface DispatchProps {
  loadProducts: typeof loadProducts;
}

interface LovedProps extends OwnProps, StateProps, DispatchProps {}

const Home: React.FC<LovedProps> = ({
  products,
  productsPage,
  isLoggedin,
  loadProducts,
}) => {
  const [t] = useTranslation();
  const handleScrollEnd = async (e: any) => {
    await loadProducts(productsPage);
    e.target.complete();
  };

  useEffect(() => {
    loadProducts(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedin]);

  return (
    <IonPage>
      <IonContent>
        <PageHeader title="Franko shop" />
        <Sprint />
        <Link to="categories">
          <IonCardHeader className="categories__header">
            <IonCardTitle>{t("categories")}</IonCardTitle>
          </IonCardHeader>
        </Link>
        <IonGrid>
          <IonRow>
            {products.map((p) => (
              <IonCol size="6" key={p.id}>
                <ProductCard
                  id={p.id}
                  name={p.name}
                  loved={p.loved}
                  image={p.image}
                  sizes={p.sizes}
                  price={p.price}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonInfiniteScroll onIonInfinite={handleScrollEnd}>
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    products: state.data.products,
    productsPage: state.data.productsPage,
    isLoggedin: state.user.isLoggedin,
  }),
  mapDispatchToProps: {
    loadProducts,
  },
  component: Home,
});
