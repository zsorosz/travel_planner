import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class Plan extends Component{
    render(){
        return(
            <div>
                <Typography variant="h5" component="h4">Your Plan:</Typography>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Title
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Content
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Edit Plan</Button>
                        </CardActions>
                    </Card>
            </div>
        )
    }
}

export default Plan;