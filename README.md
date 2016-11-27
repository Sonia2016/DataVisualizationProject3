# DataVisualizationProject3
Project 3: Network visualization

### First Meeting - November 18th
#### Check the problem definition
We check the cbioportal webpage for obtaining the data.
In data set tab, we open the one of the cancer studies and after that downloaded the data "Download Data". In that folder we need the file called "data_mutations_extended.txt".

- [X] Check how to connect to the web application and obtain related data to the specific study
- [X] Reading the study and figure out which information (Maede and Sonia)
  1. Gene
  2. Study or disease
    1. which info in those studies are important such as gender
- [ ] Decide which types of visualization do we want to select (pie, plot, ...) (at this step - Maede and Sonia)

##### Next meeting Monday 21st 2:30pm

### Second Meeting - November 21st
Discuss about what we did and deliever what we done so far, you can check them in our action list

##### Next meeting Friday 25th 2:00pm


### Third Meeting - November 25th
Each of us was working on the understanding the concept related to the cancer to how to visualize the most important of them.
According too much work and not understandable data in this webpage we decided to determine our work by our preference.
We want to work just 4 studies (related to Melanoma: one of us has family history about this disease) and we decided to partition our work in parallel.

- [ ] Complete the data obtaining from the webpage - Jeff
- [ ] Working on how to visualize the data related to the each study (which/how) - Maede
- [ ] Find the criteria for visualizing the gene interaction and network of them - Sonia
##### Next meeting Monday 28th 4:30pm


###### Action List
- Sonia
  1. I was comparing this two studies
    1. http://www.cbioportal.org/study?id=brca_metabric#summary
      1. it has 2509 patients
    2. http://www.cbioportal.org/study?id=brca_tcga_pub2015#summary
      1. It has 114 patients
  2. By comparing these two studies and browsing the data related to each of them I figured out they have multiple differences such as:
    1.  CNA data (second)
    2.	Cent17 (second)
    3.	HER2 status (first)
    4.	Neoplasm disease stage American joint community code (second)
    5.	Neoplasm histologic grade (first)
  3. Therefore, we can conclude that different studies have different domain for comparison and they consider different factor for their studies. The good news is that, we have whole data related to each factor in each study data. 
  4. Our first goal is that how to represent those data and also how to obtain those information from website (the query)
  5. The other goal is that we should connect different plot to each other for example
    1.	Number of mutations, gender, diagnosis age, CNA gene and etc.
  6. I also checked this paper "Cancer Genome Landscape", but I fortunately I didn't find any similarities between studies and this paper for good understand
    1. I think we should decide on which type of disease we want to work. Hence, we can focus on the parameters that are important for that disease, and ask questions from experts
  6. Note
    1.	Based on the dataset we have 147 different studies 
    2.	The current template that professor gave us has 126 different studies
  
- Jeff
  1. I was able to begin converting the web api calls from the AngularJS application to pure JavaScript. I've put together a barebones site that includes a call to the method that returns the list of all studies.
  2. The service objects use Promises to defer execution until the web api calls return; these are supported by Chrome.
  3. Next up will be to add the remaining api calls so we can pull the rest of the data as needed.



