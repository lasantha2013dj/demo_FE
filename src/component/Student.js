import FetchStudents from "./FetchStudents";
import SaveStudents from "./SaveStudents";
import FetchAllStudents from "./FetchAllStudents";

function Student() {


    return (
        <div style={{display: 'flex', height: '100vh'}}>

            {/* Right side */}
            <div style={{flex: 1, backgroundColor: '#f0f0f0', padding: '20px'}}>
                <h2>Add Student</h2>
                <SaveStudents/>
            </div>

            <div style={{flex: 1, backgroundColor: '#d0eaff', padding: '20px'}}>
                <h2>Search Student</h2>
                <FetchStudents/>
            </div>

            <div style={{flex: 1, backgroundColor: '#f0f0f0', padding: '20px'}}>
                <h2>Search All</h2>
                <FetchAllStudents/>
            </div>

        </div>
    );

}

export default Student;