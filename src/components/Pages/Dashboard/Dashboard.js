import { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount,
} from "../../../redux/actions/profileActions";
import Spinner from "../../common/spinner/Spinner";
import ProfileActions from "./ProfileActions";
import ExpCard from "./ExpCard";
import EduCard from "./EduCard";
import SideNav from "../../Layouts/SideNav/SideNav";
import Header from "../../Layouts/Header/Header";
import PostBgImg from "./PostBgImg";
import PostImg from "./PostImg";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { firstname, lastname } = this.props.auth.user.payload;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length <= 0) {
        dashboardContent = (
          <div className="page-main dashboard">
            <div className="dashboard__no-profile u-center-text">
              <h2 className="dashboard__wel-note u-margin-top-large">
                Welcome {firstname} {lastname}
              </h2>
              <p className="dashboard__text u-margin-top-smaller">
                You have no profile yet
              </p>
              <Link
                to="/create-profile"
                className="btn btn--pry  u-margin-top-smaller"
              >
                Create Profile
              </Link>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div className="page-main dashboard">
            {/* <h1 className=" heading--pry dashboard__title">Dashboard</h1> */}
            <div className="dashboard__cover">
              <img
                className="dashboard__cover--bg-img"
                src={`${
                  profile.content.bgImgUrl ||
                  "https://images.unsplash.com/photo-1504966981333-1ac8809be1ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                }`}
                alt="bg"
              />
              <PostBgImg history={this.props.history} />
              <div className="dashboard__cover--avatar">
                <img
                  src={`${
                    profile.content.imgUrl ||
                    profile.content.avatar ||
                    "https://th.bing.com/th/id/OIP.w5dy8Ty-r7VnqxXv5-xi3QHaHU?pid=ImgDet&rs=1"
                  }`}
                  alt="avatar"
                />
                <PostImg history={this.props.history} />
              </div>
            </div>
            <div className="container">
              <p className="dashboard__name">
                {firstname} {lastname}
              </p>
              {profile.content.handle ? (
                <div>
                  <Link
                    to={`/profile/${this.props.auth.user.payload.id}`}
                    className="dashboard__handle u-margin-top-smaller"
                  >
                    @{profile.content.handle}
                  </Link>
                </div>
              ) : null}
              <div>
                <Link
                  to={`/profile/${this.props.auth.user.payload.id}`}
                  className="btn btn--pry  u-margin-top-small"
                >
                  View Profile
                </Link>
              </div>

              <ProfileActions />
              <ExpCard experience={profile.content.experience} />
              <EduCard education={profile.content.education} />
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn--danger u-margin-bottom-large"
              >
                Delete Account
              </button>
            </div>
          </div>
        );
      }
    }
    return (
      <div>
        <Header />
        <div className="page-body">
          {dashboardContent} <SideNav />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
})(Dashboard);
