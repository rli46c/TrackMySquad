import React from 'react';
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader
} from '@material-ui/core';
import {
	Dashboard as DashIcon,
	AccountBalance,
	People,
	BarChart,
	Layers,
	Assignment
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export const mainListItems = (
	<div>
		<Link to='/dash' style={{ textDecoration: 'none' }}>
			<ListItem button>
				<ListItemIcon>
					<DashIcon />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
			</ListItem>
		</Link>

		<Link to='/companies' style={{ textDecoration: 'none' }}>
			<ListItem button>
				<ListItemIcon>
					<AccountBalance />
				</ListItemIcon>
				<ListItemText primary='Companies' />
			</ListItem>
		</Link>

		<Link to='/projects' style={{ textDecoration: 'none' }}>
			<ListItem button>
				<ListItemIcon>
					<Layers />
				</ListItemIcon>
				<ListItemText primary='Projects' />
			</ListItem>
		</Link>

		<Link to='/team' style={{ textDecoration: 'none' }}>
			<ListItem button>
				<ListItemIcon>
					<People />
				</ListItemIcon>
				<ListItemText primary='Team Members' />
			</ListItem>
		</Link>

		<ListItem button>
			<ListItemIcon>
				<BarChart />
			</ListItemIcon>
			<ListItemText primary='Reports' />
		</ListItem>
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Saved reports</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<Assignment />
			</ListItemIcon>
			<ListItemText primary='Current month' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<Assignment />
			</ListItemIcon>
			<ListItemText primary='Last quarter' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<Assignment />
			</ListItemIcon>
			<ListItemText primary='Year-end sale' />
		</ListItem>
	</div>
);
