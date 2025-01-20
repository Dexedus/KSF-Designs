// Function to handle when an element comes into view
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // You can add a class based on the element's ID or any other logic
        const id = entry.target.id;
  
        // Adding different classes based on element's ID
        if (id === 'observedTextLeft') {
          entry.target.classList.add('fadeFromLeft1');
        } else if (id === 'observedImageRight') {
          entry.target.classList.add('fadeFromRight1');
        } else if (id === 'observedTextRight') {
          entry.target.classList.add('fadeFromRight2');
        } else if (id === 'observedImageLeft') {
          entry.target.classList.add('fadeFromLeft2');
        }else if (id === 'observedFeature1') {
          entry.target.classList.add('fadeFromBottom1');
        }else if (id === 'observedFeature2') {
          entry.target.classList.add('fadeFromBottom2');
        }else if (id === 'observedFeature3') {
          entry.target.classList.add('fadeFromBottom3');
        }else if (id === 'aboutMeP1') {
          entry.target.classList.add('fadeFromBottom1');
        }else if (id === 'aboutMeP2') {
          entry.target.classList.add('fadeFromBottom2');
        }else if (id === 'aboutMeP3') {
          entry.target.classList.add('fadeFromBottom3');
        }else if (id === 'element3') {
          entry.target.classList.add('in-view-3');
        }

  
        // Stop observing the element once it's in view
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Create the IntersectionObserver instance
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.3, // You can adjust the threshold as needed
  });
  
  // Select all the elements you want to observe
  const elementsToObserve = document.querySelectorAll('.box');
  
  // Start observing each element
  elementsToObserve.forEach(element => {
    observer.observe(element);
  });