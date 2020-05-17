import React, { useState, useEffect } from "react";
import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonIcon,
  IonFabButton,
  IonFab,
} from "@ionic/react";
import "./index.css";
import { heartOutline, heart } from "ionicons/icons";
import { connect } from "../../data/connect";
import {
  addOrRemoveLoved,
  setError,
} from "../../data/sessions/sessions.actions";
import { Link } from "react-router-dom";

interface OwnProps {
  id: number;
  name: string;
  loved: boolean;
}

interface StateProps {
  isLoggedin: boolean;
}

interface DispatchProps {
  addOrRemoveLoved: typeof addOrRemoveLoved;
  setError: typeof setError;
}

interface ProductCardProps extends OwnProps, StateProps, DispatchProps {}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  loved,
  isLoggedin,
  addOrRemoveLoved,
  setError,
}) => {
  const [isLoved, setIsLoved] = useState<boolean>(false);

  useEffect(() => {
    console.log("--- useEffect productCard");
    setIsLoved(loved);
    return () => {
      console.log("--- destroy productCard");
    };
  }, [loved]);

  return (
    <div className="product">
      <IonFab
        vertical="top"
        horizontal="end"
        slot="fixed"
        onClick={() => {
          if (isLoggedin) {
            addOrRemoveLoved(id);
            setIsLoved(!isLoved);
          } else setError("you_are_not_authorized");
        }}
      >
        <IonFabButton
          size="small"
          className={isLoved ? "product__loved active" : "product__loved"}
        >
          {isLoved ? <IonIcon icon={heart} /> : <IonIcon icon={heartOutline} />}
        </IonFabButton>
      </IonFab>
      <Link to={"/product/" + id}>
        <IonImg src="assets/img/product_1.jpg" />
        <IonCardHeader className="product__header">
          <IonCardTitle className="product__title">{name}</IonCardTitle>
          <IonCardSubtitle className="product__size">
            xs, s, m, l
          </IonCardSubtitle>
          <IonCardTitle className="product__price">
            559 грн <del>1400 грн</del>
          </IonCardTitle>
        </IonCardHeader>
      </Link>
    </div>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedin: state.user.isLoggedin,
  }),
  mapDispatchToProps: {
    addOrRemoveLoved,
    setError,
  },
  component: ProductCard,
});
