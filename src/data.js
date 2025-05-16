export const schools = [
    { id: 's1', name: 'Greenwood High' },
    { id: 's2', name: 'Riverdale School' }
  ];
  
  export const classes = [
    { id: 'c1', name: 'Class 1', schoolId: 's1' },
    { id: 'c2', name: 'Class 2', schoolId: 's1' },
    { id: 'c3', name: 'Class 3', schoolId: 's2' }
  ];
  
  export const books = [
    { id: 'b1', title: 'Math Basics', author: 'John Doe', mrp: 200, classId: 'c1' },
    { id: 'b2', title: 'Science Fundamentals', author: 'Jane Smith', mrp: 250, classId: 'c1' },
    { id: 'b3', title: 'History 101', author: 'Alice Brown', mrp: 180, classId: 'c2' },
  ];
  