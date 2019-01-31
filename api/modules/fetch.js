const User = require("../models/User");
const Lab = require("../models/Lab");
const Container = require("../models/Container");
const Physical = require("../models/Physical");
const Virtual = require("../models/Virtual");

let breadcrumbArray = [];

const mongoFetch = {
  fetchAll: async (Model) => {
    let results;
    let allContainers = await getAll(Container);
    let allPhysicals = await getAll(Physical);
    switch (Model) {
      case Lab:
        results = await Model.find()
        .populate({
          path: 'createdBy',
          select: '_id username'
        })
        .populate({
          path: 'updatedBy',
          select: '_id username'
        })
        .populate({
          path: 'users',
          select: '_id username'
        })
        .populate({
          path: 'joinRequests',
          select: '_id username'
        });
        for(let i = 0; i < results.length; i++) {
          breadcrumbArray = [];
          results[i]['breadcrumbs'] = await getBreadcrumbs(results[i]._id);
          results[i]['children'] = await getChildren(results[i], allContainers, allPhysicals, 0, 0);
          results[i]['type'] = 'Lab';
          results[i]['endpoint'] = 'labs';
        }
        break;
      case Container:
        results = await Model.find()
        .populate({
          path: 'parent',
          select: '_id name'
        })
        .populate({
          path: 'createdBy',
          select: '_id username'
        })
        .populate({
          path: 'updatedBy',
          select: '_id username'
        })  
        .populate({
          path: 'lab',
          select: '_id name'
        });
        for(let i = 0; i < results.length; i++) {
          breadcrumbArray = [];
          results[i]['breadcrumbs'] = await getBreadcrumbs(results[i]._id);
          results[i]['children'] = await getChildren(results[i], allContainers, allPhysicals, 0, 0);
          results[i]['type'] = 'Container';
          results[i]['endpoint'] = 'containers';
        }
        break;
      case Physical:
        results = await Model.find()
        .populate({
          path: 'parent',
          select: '_id name'
        })
        .populate({
          path: 'createdBy',
          select: '_id username'
        })
        .populate({
          path: 'updatedBy',
          select: '_id username'
        })
        .populate({
          path: 'lab',
          select: '_id name'
        })
        .populate('virtual');
        for(let i = 0; i < results.length; i++) {
          breadcrumbArray = [];
          results[i]['breadcrumbs'] = await getBreadcrumbs(results[i]._id);
          results[i]['type'] = 'Physical';
          results[i]['endpoint'] = 'physicals';
        }  
        break; 
      case Virtual:
        results = await Model.find()
        .populate({
          path: 'createdBy',
          select: '_id username'
        })
        .populate({
          path: 'updatedBy',
          select: '_id username'
        });  
        for(let i = 0; i < results.length; i++) {
          results[i]['type'] = 'Virtual';
          results[i]['endpoint'] = 'virtuals';
        } 
        break; 
      case User:
        results = await Model.find().select({ password: 0, email: 0, name: 0, settings: 0});
        for(let i = 0; i < results.length; i++) {
          results[i]['type'] = 'User';
          results[i]['endpoint'] = 'users';
        }   
        break;      
      default:
        results = null;
    }
    return results;
  },
  fetchOne: async (Model, id) => {
    let isTestMode = process.env.NODE_ENV === 'test';
    let result;
    let allContainers = await getAll(Container);
    let allPhysicals = await getAll(Physical);
    if (!isTestMode) {
      switch (Model) {
        case Lab:
          result = await Model.findOne({_id: id})
          .populate({
            path: 'createdBy',
            select: '_id username'
          })
          .populate({
            path: 'updatedBy',
            select: '_id username'
          })
          .populate({
            path: 'users',
            select: '_id username'
          })
          .populate({
            path: 'joinRequests',
            select: '_id username'
          });
          result['children'] = await getChildren(result, allContainers, allPhysicals, 0, 0);
          result['type'] = 'Lab';
          result['endpoint'] = 'labs';
          break;
        case Container:
          result = await Model.findOne({_id: id})
          .populate({
            path: 'parent',
            select: '_id name'
          })
          .populate({
            path: 'createdBy',
            select: '_id username'
          })
          .populate({
            path: 'updatedBy',
            select: '_id username'
          })
          .populate({
            path: 'lab',
            select: '_id name'
          });
          result['children'] = await getChildren(result, allContainers, allPhysicals, 0, 0);
          breadcrumbArray = [];
          result['breadcrumbs'] = await getBreadcrumbs(result._id);
          result['type'] = 'Container';
          result['endpoint'] = 'containers';
          break;  
        case Physical:
          result = await Model.findOne({_id: id}).populate({
            path: 'parent',
            select: '_id name'
          })
          .populate({
            path: 'createdBy',
            select: '_id username'
          })
          .populate({
            path: 'updatedBy',
            select: '_id username'
          })
          .populate({
            path: 'lab',
            select: '_id name'
          })
          .populate('virtual'); 
          breadcrumbArray = [];
          result['breadcrumbs'] = await getBreadcrumbs(result._id);
          result['type'] = 'Physical';
          result['endpoint'] = 'physicals'; 
          break;  
        case Virtual:
          result = await Model.findOne({_id: id})
          .populate({
            path: 'createdBy',
            select: '_id username'
          })
          .populate({
            path: 'updatedBy',
            select: '_id username'
          });  
          result['type'] = 'Virtual';
          result['endpoint'] = 'virtuals';
          break;  
        case User:
          result = await Model.findOne({_id: id}).select({ password: 0, email: 0, name: 0, settings: 0});  
          result['type'] = 'User';
          result['endpoint'] = 'users';
          break;       
        default:
          result = null;
      }
    } else {
      // test mode without populate
      result = await Model.findOne({_id: id});
    }  
    return result;
  }
};

module.exports = mongoFetch;

async function getAll(Model) {
  let results;
  switch (Model) {
    case Lab:
      results = await Model.find()
      .populate({
        path: 'createdBy',
        select: '_id username'
      })
      .populate({
        path: 'updatedBy',
        select: '_id username'
      })  
      .populate({
        path: 'users',
        select: '_id username'
      })
      .populate({
        path: 'joinRequests',
        select: '_id username'
      });
      break;
    case Container:
      results = await Model.find()
      .populate({
        path: 'parent',
        select: '_id name'
      })
      .populate({
        path: 'createdBy',
        select: '_id username'
      })
      .populate({
        path: 'updatedBy',
        select: '_id username'
      })
      .populate({
        path: 'lab',
        select: '_id name'
      });
    case Physical:
      results = await Model.find()
      .populate({
        path: 'parent',
        select: '_id name'
      })
      .populate({
        path: 'createdBy',
        select: '_id username'
      })
      .populate({
        path: 'updatedBy',
        select: '_id username'
      })
      .populate({
        path: 'lab',
        select: '_id name'
      })
      .populate('virtual');  
      break; 
    case Virtual:
      results = await Model.find()
      .populate({
        path: 'createdBy',
        select: '_id username'
      })
      .populate({
        path: 'updatedBy',
        select: '_id username'
      });  
      break;    
    default:
      results = null;
  }
  return results;
}

async function getChildren(record, allContainers, allPhysicals, cTotal, pTotal) {
  try {

    // filter all containers into children of record
    let containers = [];
    for(let i = 0; i < allContainers.length; i++){
      let container = allContainers[i];
      let containerChildOfLab = Object.keys(container).indexOf('parent') === -1;
      let containerMatchesParent = containerChildOfLab ? String(container.lab._id) === String(record._id) : String(container.parent._id) === String(record._id);
      if (containerMatchesParent) {
        cTotal += 1;
        container.children = await getChildren(container, allContainers, allPhysicals, cTotal, pTotal);
        containers.push(container);
      }
    }

    // filter all physicals into children of record
    let physicals = [];
    for(let i = 0; i < allPhysicals.length; i++){
      let physical = allPhysicals[i];
      if (physical.parent !== "") {
        if (String(physical.parent._id) === String(record._id)) {
          pTotal += 1;
          physicals.push(physical);
        }
      }
    }

    let result = { 
      'containers': containers, 
      'physicals': physicals,
      'totalPhysicalsCount': pTotal,
      'totalContainersCount': cTotal 
    };
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getBreadcrumbs(recordId) {
  try {
    let type = 'Container';
    let record = await Container.findOne({_id: recordId}).populate('parent').populate('lab');
    if (!record) {
      type = 'Physical'; 
      record = await Physical.findOne({_id: recordId}).populate('parent').populate('lab'); 
      if (!record) { 
        type = 'Lab';
        record = await Lab.findOne({_id: recordId});
        if (!record) { console.log(`lab with id of ${recordId} not found`); }
      }
    }

    let recordExists = record && Object.keys(record._doc).length > 0;
    let parentAttrExists = Object.keys(record._doc).indexOf('parent') > -1;
    let recordParentExists = recordExists && parentAttrExists && Object.keys(record.parent).length > 0;
    breadcrumbArray.unshift(record);
    if (parentAttrExists) {       
      await getBreadcrumbs(record.parent._id);
    }
    return breadcrumbArray;  
  } catch (error) {
    console.error(error);
    throw error;  
  }
}