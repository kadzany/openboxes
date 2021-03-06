import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Translate from '../../utils/Translate';
import GlobalSearch from '../GlobalSearch';
import LocationChooser from '../location/LocationChooser';
import UserActionMenu from '../user/UserActionMenu';


class Header extends Component {
  logoutImpersonatedUser() {
    const url = '/openboxes/api/logout';

    this.apiClient.post(url)
      .then(() => {
        window.location = '/openboxes/dashboard/index';
      });
  }

  render() {
    return (
      <div className="w-100">
        {this.props.isImpersonated ?
          <div className="d-flex notice">
            <div className="ml-1"><Translate id="react.default.impersonate.label" defaultMessage="You are impersonating user" /></div>
            <div className="ml-1"><b>{this.props.username}</b></div>
            <div className="ml-1">
              <a
                href="#"
                onClick={() => this.logoutImpersonatedUser()}
              >
                <Translate id="react.default.logout.label" defaultMessage="Logout" />
              </a>
            </div>
          </div> : null}
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="logo-header">
            <a
              href="/openboxes"
              className="navbar-brand brand-name"
            >
              { this.props.logoUrl !== '' ?
                <img alt="Openboxes" src={this.props.logoUrl} onError={(e) => { e.target.onerror = null; e.target.src = 'https://openboxes.com/img/logo_30.png'; }} /> : null
            }
            </a>
            { this.props.logoLabel.trim() !== '' ? <span>{this.props.logoLabel} </span> : null }
          </div>
          <div className="d-flex flex-wrap">
            <GlobalSearch />
            <UserActionMenu />
            <LocationChooser />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.session.user.username,
  isImpersonated: state.session.isImpersonated,
  logoUrl: state.session.logoUrl,
  logoLabel: state.session.logoLabel,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  /** Active user's username */
  username: PropTypes.string.isRequired,
  /** Indicator if active user is impersonated */
  isImpersonated: PropTypes.bool.isRequired,
  /** Id of the current location */
  logoUrl: PropTypes.string.isRequired,
  /** Id of the current location */
  logoLabel: PropTypes.string.isRequired,
};
