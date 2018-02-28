import * as React from "react"
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap"
import {Message} from "../message"

import * as SearchUtils from "../utilities/search-utilities"
import SearchResult from "./search-result"
export default class RegionSummariesSearch extends React.Component {

    constructor() {
        super()
        this.state = {
            message: { message: "", type: "danger" },
            results: []
        }

        this.searchForm = { }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        SearchUtils.getResultsAsynch('/v1/api/reports/regionsummaries', this.searchForm)
            .then(results => {
                this.setState({ results: results, message: { message: "", type: "danger" } })
            })
    }

    render() {
        return (
            <div className="col-md-8 col-md-offset-2">
                <Form onChange={this.onChange}>
                    <h3>Search Region Summaries</h3>

                    <Message message={this.state.message} />
                    
                    <FormGroup>
                        <ControlLabel>Region</ControlLabel>
                        <FormControl type="text"
                            inputRef={regionId => this.searchForm.regionId = regionId}
                            placeholder="enter region ID" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>User</ControlLabel>
                        <FormControl type="text"
                            inputRef={userId => this.searchForm.userId = userId}
                            placeholder="enter user ID" />
                    </FormGroup>
                    <FormGroup className="form-inline">
                        <ControlLabel className="right-margin">From</ControlLabel>
                        <FormControl className="right-margin" type="datetime-local"
                            inputRef={fromTime => this.searchForm.fromTime = fromTime}
                            defaultValue={SearchUtils.getFormDate(SearchUtils.getDateDaysAgo(7))} />

                        <ControlLabel className="right-margin">To</ControlLabel>
                        <FormControl className="right-margin" type="datetime-local"
                            inputRef={toTime => this.searchForm.toTime = toTime} />
                    </FormGroup>
                </Form>

                <SearchResult results={this.state.results} />
            </div>
        )
    }
    
    onChange(e) {
        e.preventDefault()
        SearchUtils.getResultsAsynch('/v1/api/reports/regionsummaries', this.searchForm)
            .then(results => {
                this.setState({ results: results, message: { message: "", type: "danger" } })
            })
            .catch(error => this.setState({ message: { message: error, type: "danger" } }))
    }
}
