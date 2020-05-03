import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import InputField from "../../common/inputFieldGroup/InputTextField";
import InputTextArea from "../../common/inputFieldGroup/InputTextArea";
import InputSelect from "../../common/inputFieldGroup/InputSelect";
import styles from "./EditProfile.module.css";
import {
  postCurrentProfile,
  getCurrentProfile,
} from "../../../redux/actions/profileActions";
import isEmpty from "../../../helpers/isEmpty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      skills: "",
      status: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile.content;

      const skillsCSV = profile.skills.join(",");

      profile.company = !isEmpty(profile.company) ? profile.company : "";

      profile.website = !isEmpty(profile.website) ? profile.website : "";

      profile.location = !isEmpty(profile.location) ? profile.location : "";

      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";

      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

      profile.social = !isEmpty(profile.social) ? profile.social : {};

      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";

      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";

      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";

      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";

      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };
    this.props.postCurrentProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let { displaySocialInputs } = this.state;
    let socials;
    if (displaySocialInputs) {
      socials = (
        <div>
          <InputField
            type="text"
            name="twitter"
            value={this.state.twitter}
            placeholder="Twitter"
            classname={styles.input}
            onChange={this.onChange}
          />

          <InputField
            type="text"
            name="linkedin"
            value={this.state.linkedin}
            placeholder="Linkedin"
            classname={styles.input}
            onChange={this.onChange}
          />

          <InputField
            type="text"
            name="facebook"
            value={this.state.facebook}
            placeholder="Facebook"
            classname={styles.input}
            onChange={this.onChange}
          />
          <InputField
            type="text"
            name="youtube"
            value={this.state.youtube}
            placeholder="Youtube"
            classname={styles.input}
            onChange={this.onChange}
          />
          <InputField
            type="text"
            name="instagram"
            value={this.state.instagram}
            placeholder="Instagram"
            classname={styles.input}
            onChange={this.onChange}
          />
        </div>
      );
    } else {
    }

    return (
      <div className={styles.createProfile}>
        <Link to="/dashboard" className={styles.head}>
          <button className={styles.btn}>Back</button>
        </Link>
        <h1 className={styles.createProfile_h1}> Edit your profile</h1>
        <p> * = required field</p>
        <form onSubmit={this.onSubmit}>
          <InputField
            type="text"
            name="handle"
            value={this.state.handle}
            placeholder="* Handle"
            classname={styles.input}
            info="  A unique handle for you profile. Name, company name (Cannot be used)"
            onChange={this.onChange}
          />
          <InputField
            type="text"
            name="company"
            value={this.state.company}
            placeholder="Company"
            classname={styles.input}
            info="This should include th name of your company. only strings"
            onChange={this.onChange}
          />
          <InputField
            type="text"
            name="website"
            value={this.state.website}
            placeholder="Website"
            classname={styles.input}
            info="This should include the name of your website ."
            onChange={this.onChange}
          />
          <InputField
            type="text"
            name="location"
            value={this.state.location}
            placeholder="Location"
            classname={styles.input}
            info="This should include your current location in the format (state country)"
            onChange={this.onChange}
          />
          <InputField
            type="text"
            name="skills"
            value={this.state.skills}
            placeholder="Skills"
            classname={styles.input}
            info="Multiple skills should be sperated with a comma. eg(html, css, javascript)"
            onChange={this.onChange}
          />
          <InputSelect
            classname={styles.input}
            name="status"
            value={this.state.status}
            options={[
              { label: "Junior", value: "junior" },
              { label: "Intermediate", value: "intermidiate" },
              { label: "Proffessional", value: "proffessional" },
              { label: "Expert", value: "expert" },
            ]}
            onChange={this.onChange}
            info="Select your current status"
          />
          <InputField
            type="text"
            name="githubusername"
            value={this.state.githubusername}
            placeholder="Githubusername"
            classname={styles.input}
            info="Share your githubusername so people can view you public repositories"
            onChange={this.onChange}
          />
          <InputTextArea
            type="text"
            name="bio"
            value={this.state.bio}
            placeholder="bio"
            classname={styles.textarea}
            info="Tell a little about yourself"
            onChange={this.onChange}
          />

          <div>
            <button
              type="button"
              className="btn"
              onClick={() => {
                this.setState((prevState) => ({
                  displaySocialInputs: !prevState.displaySocialInputs,
                }));
              }}
            >
              Add Social Links
            </button>
            <small style={{ display: "inline" }}>Optional</small>
            {socials}
          </div>
          <input type="submit" value="Submit" className={styles.submit_btn} />
        </form>
      </div>
    );
  }
}
EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  postCurrentProfile,
  getCurrentProfile,
})(withRouter(EditProfile));