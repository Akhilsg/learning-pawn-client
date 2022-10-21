import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  Paper,
  Typography
} from '@material-ui/core';
import React from 'react'
import Controls from '../../../controls/Controls';
import "./PricingCard.scss"
import useStyles from "./styles"

const cardsData = [
  {
    id: 1,
    type: 'free',
    title: 'Free Plan',
    description: 'Lorem ipsum',
    price: 19.99,
    recurrency: 14.99,
    mostPopular: false,
    data: ['2TB Storage', '100 E-mails']
  },
  {
    id: 2,
    type: 'basic',
    title: 'Basic Plan',
    description: 'Lorem ipsum',
    price: 29.99,
    recurrency: 24.99,
    mostPopular: false,
    data: ['2TB Storage', '200 E-mails', '10 Accounts']
  },
  {
    id: 3,
    type: 'medium',
    title: 'Medium Plan',
    description: 'Lorem ipsum',
    price: 69.99,
    recurrency: 59.99,
    mostPopular: true,
    data: ['10TB Storage', '500 E-mails', '20 Accounts', '24/7 Support']
  },
];

const PricingCard = () => {
  const CardDescription = ({ title, description }) => {
    return (
      <div className="card-description">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  };

  const CardBilling = ({ price, recurrency }) => {
    return (
      <div className="card-billing">
        <p>
          <strong className="price">$ {price}</strong>
          <strong> / mo.</strong>
        </p>
        <p>
          <span className="recurrency">
            Billed Anually or	$ {recurrency}/monthly
          </span>
        </p>
      </div>
    );
  };

  const CardFeatures = ({ data }) => {
    return (
      <div className="card-features">
        {data.map((item, index) => {
          return (
            <List style={{ marginTop: '10px' }}>
              <Typography
                key={index}
                style={{ justifyContent: 'space-around' }}
              >
                {item}
              </Typography>
            </List>
          )
        })}
      </div>
    );
  };

  const CardAction = () => {
    const classes = useStyles()

    return (
      <Controls.Button text="Buy Now" className={classes.button} />
    );
  };

  const PricingCard = (props) => {
    const classes = useStyles()
    const {
      type,
      title,
      description,
      price,
      recurrency,
      data,
    } = props;

    return (
      <div className={`pricing-card ${type}`}>
        <Card component={Paper} className={classes.root}>
          <CardHeader
            title={
              <CardDescription
                title={title}
                description={description}
                className={classes.header}
              />
            }
          />
          <CardContent>
            <CardBilling price={price} recurrency={recurrency} />
            <CardFeatures data={data} />
          </CardContent>
          <Divider variant='middle' />
          <CardActions className={classes.action}>
            <CardAction />
          </CardActions>
        </Card>
      </div>
    );
  };

  return (
    <div className="app-wrapper">
      <Grid container alignItems="stretch" spacing={3}>
        {cardsData.map(props => {
          return (
            <Grid item>
              <PricingCard
                {...props}
                key={props.id}
              />
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}

export default PricingCard;
