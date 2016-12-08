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

- [X] Complete the data obtaining from the webpage - Jeff
- [X] Working on how to visualize the data related to the each study (which/how) - Maede
- [X] Find the criteria for visualizing the gene interaction and network of them - Sonia

##### Next meeting Monday 28th 4:30pm

### Forth Meeting - November 28th
We discussed according to how to represent the gene interaction. With discussion with Dr. Dang we figured out we shouldn't wory about the gene networks. We should just work on the study and related gene in those studies.

- [X] Wokring on the data - Jeff
- [X] Working on parallel cordinate for each study - Maede
- [X] Working on the basic template to understand how to work on that and also work with the gene data - Sonia

##### Next meeting Monday 30th 4:30pm

### Fifth Meeting - November 30th
We talked and prepared the first draft of our visualization and made decision to work on which data/categories/studies.

- [ ] Finalize the data in webservice - Jeff
- [ ] Working on parallel cordinate for each study - Maede
- [ ] Working with gene detail/ location of the gene/ statistics of the special gene on four studies- Sonia

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

- Maede

  I did some study of the structure of data we have and the template that the professor gave us and found the following:
 1. In the data set that we obtain from cbiPortal, in the folder for each study (for example paac_jhu_2014) we have a file called *data_mutations_extended.txt*. The first column in this file is Hugo_Symbol which is another identifier for a gene. A gene is identified either by Hugo gene symbol or gene aliases.
 2. Whatever we have in the network template of professor is not gene name or alias, but ....
 3. What we have to do is to 
  1) start from "data_mutations_extended" get the genes involved in that study
	2) put all the gene names in the search box
 	3) The linkes in the network corresponds to the number of times two gene appear together in on study
 	4) assume we have selected two related genes, then when we click on one of the genes 
 		- a drop down list should appear and we have to select a "numeric" parameter (from data_mutations_extended : e.g. Chromosome, start position ..)
 		- we have to show the value of that parameter in different studies.
 		- when clicked on a study we show the related information in the study i.e. the file "study_view_clinical_data"
 			parameters like cancer type, age of the patients, gender, sample size, ....
 		
 4. We can also start from study and go to gene. For example we will have a drop down list containng the studies. when we click on a study
 	we see a graph containing the gene names and their mutation number.

## Data description

### cBioPortal sources

The data used for this project were pulled from [the cBioPortal web site](http://www.cbioportal.org/). Four
studies on skin cutaneous melanoma were selected:

  - [Melanoma (Broad/Dana Farber, Nature 2012)](http://www.cbioportal.org/study?id=skcm_broad_dfarber#summary)
  - [Skin Cutaneous Melanoma (Broad, Cell 2012)](http://www.cbioportal.org/study?id=skcm_broad#summary)
  - [Skin Cutaneous Melanoma (TCGA, Provisional)](http://www.cbioportal.org/study?id=skcm_tcga#summary)
  - [Skin Cutaneous Melanoma (Yale, Nat Genet 2012)](http://www.cbioportal.org/study?id=skcm_yale#summary)

Seventeen genes were selected for our analysis; these genes are represented by the following symbols: 

  |Gene|Gene|Gene|Gene|Gene|Gene|
  |---|---|---|---|---|---|
  | CFTR  | TG     | TLR7 | GPRC6A | TP53 | ABCA1  |
  | GLI2  | NOD2   | TPO  | TLR3   | APC  | PLA2G3 |
  | MARCO | FGF9   | E2F1 | CIITA  | GC   |        |

Data sources within the cBioPortal site included downloadable TSV files and Web API methods.

### TSV files

Data representing the genes' mutual exclusivity were obtained in TSV files downloaded from the cBioPortal site.
For each of the four studies, a file was downloaded from the study's summary page as follows:

  1. Visit the [cBioPortal home page](http://www.cbioportal.org/index.do) and scroll down to the Query tab.
  2. Select the individual study. (The individual study must be selected, as the options differ when multiple 
  studies are selected.)
  3. For Genomic Profiles, select Mutations.
  4. For Select Patient/Case Set, select Sequenced Tumors.
  5. For Enter Gene List, select User-defined List and enter the 17 gene symbols.
      The following screenshot illustrates these options.
      [ScreenShot](docs/MutualExclusivityQueryOptions.png)
  6. When the results are displayed, click the Mutual Exclusivity tab, scroll to the end of the page, and
      click Download Full Result.
  7. Rename the downloaded file `mutex_result [study_id].txt`.

Once the four TSV files were downloaded, they were preprocessed using parseMutexFiles.py. This script parsed
the files, converted the data into an array of objects, and wrote the objects to `mutEx.json`.

