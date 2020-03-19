import React, { Component } from "react";
import Http from "../../http";
import { toast } from "bulma-toast";
class Courses extends Component {
    state = {
        courses: [],
        currentCourse: {
            id: "",
            name: ""
        }
    };

    handleChange(field, e) {
        const currentCourse = { ...this.state.currentCourse };
        currentCourse[field] = e.target.value;
        this.setState({ currentCourse });
    }

    edit(course) {
        this.setState({ currentCourse: course });
    }

    delete(id) {
        Http.delete(`/courses/${id}`).then(() => {
            this.loadCourses();
        });
    }

    save(e) {
        e.preventDefault();

        Http.post(
            "/courses" +
                (this.state.currentCourse.id
                    ? `/${this.state.currentCourse.id}`
                    : ""),
            this.state.currentCourse
        ).then(e => {
            this.loadCourses();
            toast({
                message: e.message,
                type: "is-success",
                position: "center"
            });
        });
    }

    loadCourses() {
        Http.get(`/courses`).then(data => {
            this.setState({ courses: data });
        });
    }
    componentDidMount() {
        this.loadCourses();
    }

    render() {
        const courses = this.state.courses;
        return (
            <div className="columns">
                <div className="column">
                    <div className="box">
                        {courses.length === 0 && <h3>No courses available</h3>}
                        {courses.map(course => (
                            <article className="media" key={course.id}>
                                <div className="media-content">
                                    <div className="content">
                                        <p>
                                            <strong>{course.name}</strong>
                                            <br />
                                            {course.description}
                                        </p>
                                    </div>
                                    <nav className="level is-mobile">
                                        <div className="level-left">
                                            <button
                                                type="button"
                                                className="button is-small is-danger"
                                                onClick={e =>
                                                    this.delete(course.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                className="button is-small"
                                                onClick={e => this.edit(course)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </nav>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                <div className="column">
                    <form
                        action=""
                        className="box"
                        onSubmit={e => this.save(e)}
                    >
                        <div className="field">
                            <p className="control">
                                <input
                                    value={this.state.currentCourse.name}
                                    onChange={e => this.handleChange("name", e)}
                                    className="input"
                                    type="name"
                                    required
                                    placeholder="Name"
                                />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <input
                                    value={this.state.currentCourse.description}
                                    onChange={e =>
                                        this.handleChange("description", e)
                                    }
                                    className="input"
                                    type="name"
                                    placeholder="Description"
                                />
                            </p>
                        </div>

                        <div className="field">
                            <p className="control">
                                <button className="button is-success">
                                    Save
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Courses;