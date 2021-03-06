import React, { Fragment, Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withError = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    SAFE_componentWillMount () {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.state.reqInterceptor);
      axios.interceptors.response.eject(this.state.resInterceptor)
    }

    errorConfirmed = () => {
      this.setState({error: null});
    };

    render () {
      return (
        <Fragment>
          <Modal show={this.state.error} hideBackdrop={this.errorConfirmed}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      ); 
    }
  }
};

export default withError;